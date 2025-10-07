import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store";
import { addItem, removeItem, updateItem } from "../Features/HomeSlice";
import { useSearchParams } from "react-router-dom";
import "../Home.css";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.home.items);

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    category: "",
    notes: "",
    image: "",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState("date");
  const [searchParams, setSearchParams] = useSearchParams();

  const [imageOption, setImageOption] = useState<"upload" | "url" | "none">(
    "none"
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const search = searchParams.get("q") || "";

  const filtered = items
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "category") return a.category.localeCompare(b.category);
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      ...form,
      image: imagePreview || "",
      dateAdded: new Date().toISOString(),
    };

    if (editId) {
      dispatch(updateItem({ id: editId, ...newItem }));
      setEditId(null);
    } else {
      dispatch(addItem(newItem));
    }

    // reset form
    setForm({ name: "", quantity: 1, category: "", notes: "", image: "" });
    setImagePreview(null);
    setImageOption("none");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value });
  };

  // Handle image upload from device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Live preview for image URL
  useEffect(() => {
    if (imageOption === "url" && form.image.trim()) {
      setImagePreview(form.image);
    }
  }, [imageOption, form.image]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-3">🛒 Shop'Again</h2>

      <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
        <input
          type="text"
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border p-2 w-full"
        />

        {/* --- IMAGE SELECTION --- */}
        <div className="mt-3">
          <label className="font-semibold">Image Source:</label>
          <div className="flex gap-3 mt-1">
            <label>
              <input
                type="radio"
                checked={imageOption === "upload"}
                onChange={() => {
                  setImageOption("upload");
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
              />{" "}
              Upload
            </label>
            <label>
              <input
                type="radio"
                checked={imageOption === "url"}
                onChange={() => {
                  setImageOption("url");
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
              />{" "}
              Image URL
            </label>
            <label>
              <input
                type="radio"
                checked={imageOption === "none"}
                onChange={() => {
                  setImageOption("none");
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
              />{" "}
              None
            </label>
          </div>

          {imageOption === "upload" && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          )}

          {imageOption === "url" && (
            <input
              type="url"
              placeholder="Enter image URL..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border p-2 w-full mt-2"
            />
          )}

          {/* Live image preview */}
          {imagePreview && (
            <div className="mt-3 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Search & Sort */}
      <div className="flex justify-between mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border p-2 flex-1 mr-2"
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="border p-2"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {/* Display Items */}
      <ul className="mt-4 space-y-3">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="border p-3 rounded flex items-center justify-between"
          >
            <div>
              <strong>{item.name}</strong> ({item.quantity})
              <div className="text-sm text-gray-500">{item.category}</div>
              {item.notes && <p className="text-sm">{item.notes}</p>}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 mt-2 object-cover rounded"
                />
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setForm({
                    name: item.name,
                    quantity: item.quantity,
                    category: item.category,
                    notes: item.notes ?? "",
                    image: item.image ?? "",
                  });
                  setImagePreview(item.image || null);
                  setEditId(item.id);
                  setImageOption(item.image ? "url" : "none");
                }}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
