import webpush from "web-push";
import { prisma } from "@/lib/prisma";

// Configure web-push with VAPID keys
// These should be set in environment variables
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || "";

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    "mailto:hello@bostonlegendicecream.com",
    vapidPublicKey,
    vapidPrivateKey
  );
}

export async function sendPushNotification(
  payload: { title: string; body: string; url?: string },
  targetRoles: string[] = ["OWNER", "ADMIN"],
  targetUserIds: string[] = []
) {
  if (!vapidPublicKey || !vapidPrivateKey) {
    console.warn("VAPID keys not configured, skipping push notification.");
    return;
  }

  try {
    // Find subscriptions for users in target roles or specific user IDs
    const subscriptions = await prisma.pushSubscription.findMany({
      where: {
        user: {
          OR: [
            { role: { in: targetRoles } },
            { id: { in: targetUserIds } }
          ]
        }
      },
      include: { user: true }
    });

    if (subscriptions.length === 0) return;

    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      url: payload.url || "/admin",
      icon: "/icon-192x192.png", // Ensure you have this icon
      badge: "/badge-72x72.png" // Ensure you have this badge
    });

    const sendPromises = subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          },
          notificationPayload
        );
      } catch (error: any) {
        // If subscription is invalid/expired (410), delete it
        if (error.statusCode === 410 || error.statusCode === 404) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        } else {
          console.error(`Error sending push to user ${sub.user.email}:`, error);
        }
      }
    });

    await Promise.all(sendPromises);
  } catch (error) {
    console.error("Push notification error:", error);
  }
}
