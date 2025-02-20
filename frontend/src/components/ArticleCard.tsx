import React from "react";
import { Card, Typography, Button } from "antd";
import { Article } from "../types";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Embedded SVG as a fallback image
  const dummyImageSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      style={{ backgroundColor: "#f0f0f0", color: "#ccc" }}
    >
      <rect width="400" height="200" fill="#f0f0f0" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fill="#999"
      >
        No Image Available
      </text>
    </svg>
  );

  // Check if the article image is available, otherwise use the embedded SVG
  const imageContent = article.image ? (
    <img alt={article.title} src={article.image} style={{ height: 200, objectFit: "cover" }} />
  ) : (
    dummyImageSVG
  );

  return (
    <Card
      hoverable
      cover={imageContent}
      style={{ width: 400, marginBottom: 20 }}
    >
      <Title level={4}>{article.title}</Title>
      <Text type="secondary">
        {dayjs(article.published_at).format("MMM DD, YYYY")} - {article.source.name}
      </Text>
      <Text ellipsis>{article.content}</Text>
      <p>
        <strong>Source:</strong> {article.source?.name}
      </p>
      <p>
        <strong>Category:</strong> {article.category?.name}
      </p>
      <p>
        <strong>Author:</strong> {article.author?.name}
      </p>
      <div style={{ marginTop: 10 }}>
        <Button type="link" href={article.url} target="_blank">
          Read More
        </Button>
      </div>
    </Card>
  );
};

export default ArticleCard;