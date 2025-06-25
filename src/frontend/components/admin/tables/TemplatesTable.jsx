import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTemplates, deleteTemplate } from "../../../api/templateService";
import TemplateDetails from "../../Templates/TemplateDetails";
import { FaInfoCircle, FaTrash, FaSearch } from "react-icons/fa";

const statusColor = (val) => (val ? "green" : "red");

const TableWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TopBar = styled.div`
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
  max-height: 520px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Segoe UI", sans-serif;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Status = styled.span`
  color: ${({ purchasable }) => statusColor(purchasable)};
  font-weight: bold;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
`;

const InfoIcon = styled(FaInfoCircle)`
  color: #6a380f;
  font-size: 18px;
  cursor: pointer;
  margin-right: 12px;
`;

const DeleteIcon = styled(FaTrash)`
  color: #e74c3c;
  font-size: 18px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-height: 90vh;
  max-width: 90vw;
  overflow-y: auto;
`;

const TemplatesTable = () => {
  const [templates, setTemplates] = useState([]);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const data = await getAllTemplates();
    setTemplates(data);
  };

  const handleSort = (key) => {
    const order = sortField === key && sortOrder === "asc" ? "desc" : "asc";
    setSortField(key);
    setSortOrder(order);
    const sorted = [...templates].sort((a, b) => {
      const aVal = key === "isPurchasable" ? (a[key] ? 1 : 0) : a[key];
      const bVal = key === "isPurchasable" ? (b[key] ? 1 : 0) : b[key];
      if (typeof aVal === "string") {
        return order === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return order === "asc" ? aVal - bVal : bVal - aVal;
    });
    setTemplates(sorted);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      await deleteTemplate(id);
      setTemplates((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const filteredTemplates = templates.filter((template) => {
    const name = template.name?.toLowerCase() || "";
    const crafter = template.crafterName?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();
    return name.includes(query) || crafter.includes(query);
  });

  return (
    <>
      <TableWrapper>
        <TopBar>
          <h2>All Templates</h2>
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
        </TopBar>

        <ScrollContainer>
          <Table>
            <thead>
              <tr>
                <Th>Image</Th>
                <Th>Name </Th>
                <Th>Crafter </Th>
                <Th onClick={() => handleSort("price")}>Price ⬍</Th>
                <Th onClick={() => handleSort("likes")}>Likes ⬍</Th>
                <Th onClick={() => handleSort("isPurchasable")}>Purchasable ⬍</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template._id}>
                  <Td>
                    <Avatar
                      src={template.mainImage || require("../../../assets/SR.png").default}
                      alt="template"
                    />
                  </Td>
                  <Td>{template.name}</Td>
                  <Td>{template.crafterName || "Unknown"}</Td>
                  <Td>
                    <Bold>${template.price}</Bold>
                  </Td>
                  <Td>
                    <Bold>{template.likes || 0}</Bold>
                  </Td>
                  <Td>
                    <Status purchasable={template.isPurchasable}>
                      {template.isPurchasable ? "Yes" : "No"}
                    </Status>
                  </Td>
                  <Td>
                    <InfoIcon onClick={() => setSelectedTemplate(template)} />
                    <DeleteIcon onClick={() => handleDelete(template._id)} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollContainer>
      </TableWrapper>

      <ModalOverlay show={!!selectedTemplate} onClick={() => setSelectedTemplate(null)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <TemplateDetails template={selectedTemplate} mode="view" />
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TemplatesTable;
