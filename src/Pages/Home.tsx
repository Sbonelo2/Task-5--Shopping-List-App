import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store";
import { addItem, removeItem } from "../Features/HomeSlice";
import { v4 as uuidv4 } from "uuid";


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addItem({ id: uuidv4(), ...form }));
    setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛒 Shopping Checklist</h1>

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

        <button type="submit">Add Item</button>
      </form>

      {/* List */}
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong> (x{item.quantity}) - {item.category}
            {item.notes && <p>📝 {item.notes}</p>}
            {item.image && (
              <img src={item.image} alt={item.name} width={50} height={50} />
            )}
            <button onClick={() => dispatch(removeItem(item.id))}>
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
