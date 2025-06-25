import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import SRImage from "../../../assets/SR.png";
import { fetchAllOrders } from "../../../api/orderService";

const statusColors = {
  paid: "#00bcd4",
  unpaid: "#39208A",
  confirmed: "#e09f1d",
  pending: "orange",
};

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
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  color: #444;
  font-weight: 600;
  background: #fafafa;
  position: sticky;
  top: 0;
  z-index: 1;
  cursor: ${(props) => (props.sortable ? "pointer" : "default")};
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const ColoredText = styled(BoldText)`
  color: ${({ color }) => color || "#000"};
`;

const Avatar = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 8px;
  object-fit: cover;
`;

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const loadOrders = async () => {
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sorted = [...orders].sort((a, b) => {
      const aVal = field === "createdAt" ? new Date(a.createdAt) : a[field];
      const bVal = field === "createdAt" ? new Date(b.createdAt) : b[field];
      return order === "asc" ? aVal - bVal : bVal - aVal;
    });
    setOrders(sorted);
  };

  const filteredOrders = orders.filter((order) => {
    const templateName = order.template?.name?.toLowerCase() || "";
    const crafterName = order.crafterName?.toLowerCase() || "";
    const userName = order.customerName?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return (
      templateName.includes(query) ||
      crafterName.includes(query) ||
      userName.includes(query)
    );
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  return (
    <TableWrapper>
      <HeaderRow>
        <h2>All Orders</h2>
        <SearchWrapper>
          <ToggleSearchButton onClick={() => setShowSearch((prev) => !prev)}>
            <FaSearch />
          </ToggleSearchButton>
          <SearchContainer visible={showSearch}>
            <SearchInput
              type="text"
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

      <ScrollContainer>
        <Table>
          <thead>
            <tr>
              <Th>Image</Th>
              <Th>Template</Th>
              <Th sortable="true" onClick={() => handleSort("price")}>
                Price ⬍
              </Th>
              <Th>User</Th>
              <Th>Crafter</Th>
              <Th sortable="true" onClick={() => handleSort("createdAt")}>
                Date ⬍
              </Th>
              <Th>Status</Th>
              <Th>Paid</Th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <Td>
                  <Avatar
                    src={
                      order.template?.mainImage || SRImage
                    }
                    alt="template"
                  />
                </Td>
                <Td>{order.template?.name || order.name || "-"}</Td>
                <Td>
                  <BoldText>${order.price?.toFixed(2) || "-"}</BoldText>
                </Td>
                <Td>{order.customerName}</Td>
                <Td>{order.template?.crafterName || "-"}</Td>
                <Td>{formatDate(order.createdAt)}</Td>
                <Td>
                  <ColoredText color={statusColors[order.status]}>
                    {order.status}
                  </ColoredText>
                </Td>
                <Td>
                  <ColoredText color={statusColors[order.paymentStatus]}>
                    {order.paymentStatus}
                  </ColoredText>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollContainer>
    </TableWrapper>
  );
};

export default OrdersTable;
