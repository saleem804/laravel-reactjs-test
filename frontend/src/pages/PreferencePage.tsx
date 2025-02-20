import React, { useEffect, useState } from "react";
import { Select, Button, message, Card, Typography, Spin } from "antd";
import api from "../api"; // Import API instance

const { Title } = Typography;
const { Option } = Select;

interface Source {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Preferences {
  source_ids: number[];
  category_ids: number[];
  author_ids: number[];
}

const PreferencePage: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [preferences, setPreferences] = useState<Preferences>({
    source_ids: [],
    category_ids: [],
    author_ids: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/preferences"); // Fetch from backend
      setSources(data.metadata.sources);
      setCategories(data.metadata.categories);
      setAuthors(data.metadata.authors);
      if (data.preferences) {
        setPreferences({
          source_ids: data.preferences.source_ids || [],
          category_ids: data.preferences.category_ids || [],
          author_ids: data.preferences.author_ids || [],
        });
      }
    } catch (error) {
      message.error("Failed to fetch preferences");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.post("/preferences", preferences); // Save preferences
      message.success("Preferences saved successfully!");
    } catch (error) {
      message.error("Failed to save preferences");
    }
    setLoading(false);
  };

  return (
    <Card style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
      <Title level={3}>Customize Your News Feed</Title>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <label>Preferred Sources</label>
            <Select
              mode="multiple"
              placeholder="Select sources"
              style={{ width: "100%" }}
              value={preferences.source_ids}
              onChange={(values) => setPreferences({ ...preferences, source_ids: values })}
            >
              {sources.map((source) => (
                <Option key={source.id} value={source.id}>
                  {source.name}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Preferred Categories</label>
            <Select
              mode="multiple"
              placeholder="Select categories"
              style={{ width: "100%" }}
              value={preferences.category_ids}
              onChange={(values) => setPreferences({ ...preferences, category_ids: values })}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Preferred Authors</label>
            <Select
              mode="multiple"
              placeholder="Select authors"
              style={{ width: "100%" }}
              value={preferences.author_ids}
              onChange={(values) => setPreferences({ ...preferences, author_ids: values })}
            >
              {authors.map((author) => (
                <Option key={author.id} value={author.id}>
                  {author.name}
                </Option>
              ))}
            </Select>
          </div>

          <Button type="primary" onClick={handleSave} loading={loading}>
            Save Preferences
          </Button>
        </>
      )}
    </Card>
  );
};

export default PreferencePage;
