import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store";
import { addItem, removeItem, updateItem } from "../Features/HomeSlice"; // <-- Make sure you have updateItem
import { v4 as uuidv4 } from "uuid";
import "../Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.home.items);

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    notes: "",
    category: "",
    image: "",
  });

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null); // Track the item being edited

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing item
      dispatch(updateItem({ id: editingId, ...form }));
      setEditingId(null); // Reset editing state
    } else {
      // Add new item
      dispatch(addItem({ id: uuidv4(), ...form }));
    }

    setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
  };

  // Filter items based on search
  const filteredItems = items.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      (item.notes && item.notes.toLowerCase().includes(term))
    );
  });

  // Edit button handler
  const handleEdit = (item: typeof form & { id: string }) => {
    setForm({
      name: item.name,
      quantity: item.quantity,
      notes: item.notes,
      category: item.category,
      image: item.image,
    });
    setEditingId(item.id);
  };

  return (
    <div className="home-container">
      <h1>🛒 Shopping Checklist</h1>

      {/* Search Input */}
      <label
        htmlFor="search"
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}
      >
        Search
      </label>
      <input
        type="text"
        id="search"
        className="search-input"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
      </form>

      {/* List */}
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong> (x{item.quantity}) - {item.category}
              {item.notes && <p>📝 {item.notes}</p>}
            </div>
            {item.image && (
              <img src={item.image} alt={item.name} width={50} height={50} />
            )}
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={() => handleEdit(item)}>✏️ Edit</button>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                style={{ marginLeft: "0.5rem" }}
              >
                ❌ Remove
              </button>
            </div>
          </li>
        ))}
        {filteredItems.length === 0 && <p>No items found.</p>}
      </ul>
    </div>
  );
}
