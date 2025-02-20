import { useEffect, useState } from "react";
import api from "../api";
import { Input, Select, Spin, message, Row, Col, Empty, Pagination } from "antd";
import ArticleCard from "../components/ArticleCard";
import { DatePicker } from 'antd';
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Article {
  id: number;
  title: string;
  content: string;
  url: string;
  image: string;
  source: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
  };
  published_at: string;
}

interface Metadata {
  sources: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  authors: { id: number; name: string }[];
}

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [metadata, setMetadata] = useState<Metadata>({
    sources: [],
    categories: [],
    authors: []
  });
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({});

  const fetchArticles = async (page = 1, currentFilters = filters) => {
    setLoading(true);
    try {
      const response = await api.get("/articles", {
        params: {
          page: page,
          ...currentFilters
        }
      });
      
      const articlesData = Array.isArray(response.data.data) ? response.data.data : [];
      setArticles(articlesData);
      
      setPagination({
        current: response.data.current_page,
        pageSize: response.data.per_page,
        total: response.data.total
      });
    } catch (error) {
      message.error("Failed to load articles.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      const metadataResponse = await api.get("/preferences");
      setMetadata(metadataResponse.data.metadata);
    } catch (error) {
      message.error("Failed to load metadata.");
    }
  };

  const handleSearch = (value: string) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchArticles(1, newFilters);
  };

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    fetchArticles(1, newFilters);
  };

  const handleDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
    setDateRange(dates);
    let newFilters = { ...filters };
    if (dates) {
      newFilters = {
        ...newFilters,
        start_date: dates[0].format('YYYY-MM-DD'),
        end_date: dates[1].format('YYYY-MM-DD')
      };
    } else {
      const { start_date, end_date, ...restFilters } = newFilters;
      newFilters = restFilters;
    }
    setFilters(newFilters);
    fetchArticles(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchArticles(page);
  };

  useEffect(() => {
    fetchMetadata();
    fetchArticles(1);
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h1>News Articles</h1>

      <div style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Search news..."
          onSearch={handleSearch}
          style={{ width: "100%", marginBottom: "20px" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Row gutter={16}>
          <Col span={8}>
            <Select
              placeholder="Filter by Source"
              style={{ width: "100%" }}
              onChange={(value) => handleFilterChange('source', value)}
              allowClear
            >
              {metadata.sources.map(source => (
                <Option key={source.id} value={source.name}>{source.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              placeholder="Filter by Category"
              style={{ width: "100%" }}
              onChange={(value) => handleFilterChange('category', value)}
              allowClear
            >
              {metadata.categories.map(category => (
                <Option key={category.id} value={category.name}>{category.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <RangePicker
              style={{ width: "100%" }}
              onChange={handleDateChange}
              value={dateRange}
              allowClear
            />
          </Col>
        </Row>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />
      ) : (
        <Row gutter={[16, 16]}>
          {articles.length > 0 ? (
            articles.map(article => (
              <Col key={article.id} xs={24} sm={12} lg={8}>
                <ArticleCard
                  article={article}
                />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty
                description="No articles found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Col>
          )}
        </Row>
      )}
      {!loading && articles.length > 0 && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;
