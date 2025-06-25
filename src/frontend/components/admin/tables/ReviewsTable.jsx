import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllReviewsAdmin } from "../../../api/reviewService";
import { FaSort, FaStar, FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

// Styling
const TableWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleSearchButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: #333;
    font-size: 1.2rem;
  }
`;

const SearchContainer = styled.div`
  max-width: ${({ visible }) => (visible ? "200px" : "0")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  overflow: hidden;
  transition: max-width 0.3s ease, opacity 0.3s ease;
`;

const SearchInput = styled.input`
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 0.9rem;
  background: white;
  width: 180px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  outline: none;
`;

const ScrollContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
`;

const Thead = styled.thead`
  background: #f9f9f9;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const Th = styled.th`
  padding: 16px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
`;

const Td = styled.td`
  padding: 16px;
  white-space: nowrap;
`;

const Row = styled.tr`
  background: ${({ sentiment }) =>
    sentiment === "negative" ? "#ffe5e5" : "#eaffea"};
  border-bottom: 1px solid #ddd;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ field: "", direction: "asc" });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchAllReviewsAdmin();
      setReviews(data);
      setFiltered(data);
      setLoading(false);
    };
    load();
  }, []);

  // Filter by user, crafter, or message
  useEffect(() => {
    const lower = searchQuery.toLowerCase();
    const filteredData = reviews.filter((r) =>
      r.user.name.toLowerCase().includes(lower) ||
      r.message.toLowerCase().includes(lower) ||
      r.crafter?.name?.toLowerCase().includes(lower)
    );
    setFiltered(filteredData);
  }, [searchQuery, reviews]);

  const toggleSort = (field) => {
    const direction =
      sortConfig.field === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const sorted = [...filtered].sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      if (field === "user") {
        aVal = a.user.name;
        bVal = b.user.name;
      }
      if (field === "crafter") {
        aVal = a.crafter?.name || "";
        bVal = b.crafter?.name || "";
      }

      if (typeof aVal === "string") {
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }
    });

    setSortConfig({ field, direction });
    setFiltered(sorted);
  };

  return (
    <TableWrapper>
      <HeaderRow>
        <h2>All Reviews</h2>
        <SearchWrapper>
          <ToggleSearchButton onClick={() => setShowSearch((prev) => !prev)}>
            <FaSearch />
          </ToggleSearchButton>
          <SearchContainer visible={showSearch}>
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (searchQuery.trim() === "") setShowSearch(false);
              }}
            />
          </SearchContainer>
        </SearchWrapper>
      </HeaderRow>

      {loading ? (
        <SpinnerWrapper>
          <ClipLoader size={40} color="#39208A" />
        </SpinnerWrapper>
      ) : (
        <ScrollContainer>
          <Table>
            <Thead>
              <tr>
                <Th>User</Th>
                <Th>Message</Th>
                <Th sortable onClick={() => toggleSort("type")}>Type <FaSort /></Th>
                <Th sortable onClick={() => toggleSort("rating")}>
                  Rating <FaSort />
                </Th>
                <Th>Crafter</Th>
                <Th sortable onClick={() => toggleSort("sentiment")}>Sentiment <FaSort /></Th>
              </tr>
            </Thead>
            <tbody>
              {filtered.map((r) => (
                <Row key={r._id} sentiment={r.sentiment}>
                  <Td>{r.user.name}</Td>
                  <Td>{r.message}</Td>
                  <Td>{r.type}</Td>
                  <Td>
                    {r.rating} <FaStar size={12} color="#e09f1d" />
                  </Td>
                  <Td>{r.crafter?.name || "—"}</Td>
                  <Td>{r.sentiment}</Td>
                </Row>
              ))}
            </tbody>
          </Table>
        </ScrollContainer>
      )}
    </TableWrapper>
  );
};

export default ReviewsTable;
