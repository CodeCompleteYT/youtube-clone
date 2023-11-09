import getSubscriptionVideos from "@/actions/getSubscriptionVideos";
import SubscriptionsList from "@/components/subscriptions/SubscriptionsList";

export default async function Subscriptions() {
  const subscriptionVideos = await getSubscriptionVideos();

  return subscriptionVideos.length ? (
    <SubscriptionsList videos={subscriptionVideos} />
  ) : (
    "No videos found"
  );
}
