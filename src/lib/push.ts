import webpush from "web-push";
import { prisma } from "./prisma";

// Configure web-push
webpush.setVapidDetails(
  "mailto:info@americanlegendicecreamtruck.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "",
  process.env.VAPID_PRIVATE_KEY || ""
);

export async function sendPushNotification(userId: string, title: string, body: string, url?: string) {
  try {
    const subscriptions = await prisma.pushSubscription.findMany({
      where: { userId }
    });

    if (!subscriptions.length) return false;

    const payload = JSON.stringify({
      title,
      body,
      url: url || "/admin",
      icon: "/images/icon.png", // make sure this icon exists
    });

    const sendPromises = subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            }
          },
          payload
        );
      } catch (err: any) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Subscription expired or removed
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        } else {
          console.error("Push send error:", err);
        }
      }
    });

    await Promise.all(sendPromises);
    return true;
  } catch (error) {
    console.error("Failed to send push notification:", error);
    return false;
  }
}

export async function sendPushToRole(role: string, title: string, body: string, url?: string) {
  try {
    const users = await prisma.user.findMany({
      where: { role, active: true },
      select: { id: true }
    });
    
    if (!users.length) return false;
    
    const sendPromises = users.map(u => sendPushNotification(u.id, title, body, url));
    await Promise.all(sendPromises);
    return true;
  } catch (error) {
    console.error(`Failed to send push to role ${role}:`, error);
    return false;
  }
}
