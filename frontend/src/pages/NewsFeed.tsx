import React, { useState, useEffect } from "react";
import { fetchNewsFeed } from "../api";
import { Article } from "../types";
import ArticleCard from "../components/ArticleCard";
import { Row, Col, Spin, Alert, Empty } from "antd";

const NewsFeed: React.FC = () => {
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const articles = await fetchNewsFeed();
        setData(articles);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh' 
    }}>
      <Spin size="large" />
    </div>
  );

  if (isError) return (
    <div style={{ paddingTop: '20px' }}>
      <Alert message="Failed to load articles" type="error" />
    </div>
  );

  if (data.length === 0) return (
    <div style={{ paddingTop: '20px' }}>
      <Empty
        description="No news feeds found, update preferences"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  );

  return (
    <div style={{ paddingTop: '20px' }}>
      <Row gutter={[16, 16]} justify="center">
        {data.map((article) => (
          <Col key={article.id}>
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewsFeed;
