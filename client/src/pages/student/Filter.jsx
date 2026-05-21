
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

const categories = [
  { id: "Next JS", label: "Next JS" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack Development", label: "MERN Stack Development" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "HTML", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  // Category Handler
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(updatedCategories, sortByPrice);

      return updatedCategories;
    });
  };

  // Price Sort Handler
  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);

    handleFilterChange(selectedCategories, selectedValue);
  };

  // Clear Filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSortByPrice("");

    handleFilterChange([], "");
  };

  return (
    <div className="w-full lg:w-[260px] bg-white dark:bg-[#1a1a1a] rounded-2xl border p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-bold text-lg">
          Filter Options
        </h1>

        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
        >
          Clear
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Sort */}
      <div className="mb-6">
        <Label className="mb-2 block font-medium">
          Sort by Price
        </Label>

        <Select
          value={sortByPrice}
          onValueChange={selectByPriceHandler}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>

              <SelectItem value="low">
                Low to High
              </SelectItem>

              <SelectItem value="high">
                High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div>
        <h1 className="font-semibold mb-3">
          CATEGORY
        </h1>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() =>
                  handleCategoryChange(category.id)
                }
              />

              <Label
                htmlFor={category.id}
                className="text-sm cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;

