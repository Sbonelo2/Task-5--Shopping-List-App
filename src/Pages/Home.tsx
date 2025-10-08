import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store";
import {
  addList,
  removeList,
  updateList,
  addSubItem,
  updateSubItem,
  removeSubItem,
} from "../Features/HomeSlice";
import { v4 as uuidv4 } from "uuid";
import "../Home.css";

export default function AdvancedShoppingList() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.home.lists);

  const [newCardTitle, setNewCardTitle] = useState("");

  const [subForm, setSubForm] = useState({
    parentId: "",
    id: "",
    name: "",
    quantity: "",
    category: "",
    notes: "",
    image: "",
    imageOption: "none" as "none" | "upload" | "url",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Add new card
  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    const newCard = {
      id: uuidv4(),
      title: newCardTitle,
      date: new Date().toISOString(),
      subItems: [],
    };
    dispatch(addList(newCard));
    setNewCardTitle("");
  };

  // Delete card
  const handleDeleteCard = (id: string) => {
    dispatch(removeList(id));
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subForm.imageOption === "upload" && e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSubForm({ ...subForm, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else if (subForm.imageOption === "url") {
      setImagePreview(subForm.image);
    }
  };

  const handleSubItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.name.trim() || !subForm.quantity.trim()) return;

    const newSubItem = {
      id: subForm.id || uuidv4(),
      name: subForm.name,
      quantity: subForm.quantity,
      category: subForm.category,
      notes: subForm.notes,
      image: subForm.image,
      date: new Date().toISOString(),
    };

    if (subForm.id) {
      dispatch(
        updateSubItem({ parentId: subForm.parentId, subItem: newSubItem })
      );
    } else {
      dispatch(addSubItem({ parentId: subForm.parentId, subItem: newSubItem }));
    }

    // Reset form
    setSubForm({
      parentId: "",
      id: "",
      name: "",
      quantity: "",
      category: "",
      notes: "",
      image: "",
      imageOption: "none",
    });
    setImagePreview(null);
  };

  const handleDeleteSubItem = (parentId: string, subId: string) => {
    dispatch(removeSubItem({ parentId, subId }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛍️ Shop'Again
      </h1>

      {/* Add new card */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new shopping card title..."
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddCard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add item
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {lists.map((list) => (
          <div
            key={list.id}
            className="border rounded-2xl shadow-md bg-white p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{list.title}</h2>
              <button
                onClick={() => handleDeleteCard(list.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>

         
            <ul className="space-y-3 mb-4">
              {list.subItems.length > 0 ? (
                list.subItems.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex gap-4 items-center">
                      {sub.image && (
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="h-16 w-16 object-cover rounded shadow"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{sub.name}</h3>
                        <p className="text-sm text-gray-600">
                          {sub.quantity} • {sub.category}
                        </p>
                        {sub.notes && (
                          <p className="text-xs text-gray-500 mt-1">
                            {sub.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setSubForm({
                            parentId: list.id,
                            id: sub.id,
                            name: sub.name,
                            quantity: sub.quantity,
                            category: sub.category,
                            notes: sub.notes ?? "",
                            image: sub.image ?? "",
                            imageOption: "none",
                          })
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSubItem(list.id, sub.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  No items yet — add some below!
                </p>
              )}
            </ul>

            
            <form onSubmit={handleSubItemSubmit} className="border-t pt-3">
              <h3 className="font-semibold mb-2 text-gray-700">
                Add Item to Card
              </h3>
              <div className="grid sm:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={subForm.name}
                  onChange={(e) =>
                    setSubForm({
                      ...subForm,
                      name: e.target.value,
                      parentId: list.id,
                    })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={subForm.quantity}
                  onChange={(e) =>
                    setSubForm({ ...subForm, quantity: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={subForm.category}
                  onChange={(e) =>
                    setSubForm({ ...subForm, category: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={subForm.notes}
                  onChange={(e) =>
                    setSubForm({ ...subForm, notes: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              </div>

              {/* Image options */}
              <div className="flex gap-2 items-center">
                <select
                  value={subForm.imageOption}
                  onChange={(e) =>
                    setSubForm({
                      ...subForm,
                      imageOption: e.target.value as "none" | "upload" | "url",
                      image: "",
                    })
                  }
                  className="border p-2 rounded"
                >
                  <option value="none">No Image</option>
                  <option value="upload">Upload</option>
                  <option value="url">From URL</option>
                </select>

                {subForm.imageOption === "upload" && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                )}

                {subForm.imageOption === "url" && (
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={subForm.image}
                    onChange={(e) =>
                      setSubForm({ ...subForm, image: e.target.value })
                    }
                    onBlur={handleImageChange}
                    className="border p-2 rounded w-full"
                  />
                )}
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="mt-2 flex flex-col items-start">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md border shadow"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setSubForm({ ...subForm, image: "" });
                    }}
                    className="text-xs mt-1 text-red-500"
                  >
                    Remove Image
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded w-full"
              >
                {subForm.id ? "Update Item" : "Add Item"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
