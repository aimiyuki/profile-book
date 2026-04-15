import { createFileRoute } from "@tanstack/react-router";
import ProfileCard from "../components/ProfileCard";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MY DATA ♡ プロフィールカード" },
      { name: "description", content: "かわいいプロフィールカードを作って、SNSでシェアしよう！" },
      { property: "og:title", content: "MY DATA ♡ プロフィールカード" },
      { property: "og:description", content: "かわいいプロフィールカードを作って、SNSでシェアしよう！" },
    ],
  }),
});

function Index() {
  return <ProfileCard />;
}
