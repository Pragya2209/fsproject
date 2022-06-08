import React, { useState, useEffect } from "react";
import { getCategoryList, getAuthorList } from '../../services/api';

function FilterSearch(props) {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [option, setOption] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [filter, setFilter] = useState({})

  const updateSort = () => {
    props.setSort(1);
    setOpenSort(false);
  }
 
  useEffect (() => {
    fetchFilterList();
  }, [selectedFilter])

  const fetchFilterList = async () => {
    try {
      let response
      switch (selectedFilter) {
        case 1 : 
        response = await getCategoryList();
        break;
        case 2 : 
        response = await getAuthorList();
      }
    setOption(response.response)
    }
    catch(err) {
      console.log(err)
    }
  }

  const onApplyFilter = (apply) => {
    if (!apply)
    setFilter({})
    props.onApplyFilter(!apply ? {} : filter)
    setOpenFilter(false);
  }

  const isChecked = (v) => {
    let filterKey = selectedFilter === 1 ? 'category' : 'author'
    if (filter[filterKey] && filter[filterKey].includes(v._id)) {
      return true
    }
    return false
  }

  const onCheckValue = async (e) => {
   let v = e.target.value
   let updatedFilter = JSON.parse(JSON.stringify(filter))
   let filterKey = selectedFilter === 1 ? 'category' : 'author'
     if (!filter[filterKey]) {
      updatedFilter[filterKey] = []
     }
     if (updatedFilter[filterKey].includes (v)) {
      updatedFilter[filterKey].splice(updatedFilter[filterKey].indexOf(v), 1)
     }
     else {
      updatedFilter[filterKey].push (v)
     }
   setFilter(updatedFilter)
  }

  const displaySortOptions = () => {
    return (
      <div class="dropdown">
        <div class="dropdown-heading">
          Sort By
          <i
            class="fa fa-times clear-icon-dropdown"
            aria-hidden="true"
            onClick={() => setOpenSort(false)}
          ></i>
        </div>
        <button onClick={updateSort} class="sort-option-button">Most Recent</button>
      </div>
    );
  };

  const displayFilterOptions = () => {
    return (
      <div class="dropdown">
        <div class="dropdown-heading">
          Filter By
          <i
            class="fa fa-times clear-icon-dropdown"
            aria-hidden="true"
            onClick={() => setOpenFilter(false)}
          ></i>
        </div>
        <div>
          <div class="filter-div">
            <button onClick={() => setSelectedFilter(1)} class={`filter-heading ${selectedFilter === 1 ? 'filter-selected' : ''}`}>Technology</button>
            <button onClick={() => setSelectedFilter(2)} class={`filter-heading ${selectedFilter === 2 ? 'filter-selected' : ''}`}>Author</button>
          </div>
          <div class="filter-options-div">
            {option.map((item, index) => (
              <div key={index} class="filter-list">
                <input checked={isChecked(item)} onChange={onCheckValue} value={item._id} type="checkbox" />
                {
                selectedFilter === 1 ? 
                <span>{item.name || ''}</span>: 
                <span>{(item.firstName || '') + " " + (item.lastName || '')}</span>
                }
              </div>
            ))}
            <span class="filter-apply-button">
              <button onClick={() => onApplyFilter()} class="reset-button">Reset</button>
              <button onClick={() => onApplyFilter(1)} class="apply-button">Apply</button>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div class="input-field-div">
        <input
          class="input-field"
          placeholder="Search"
          value={props.keyword}
          onChange={props.setKeyword}
        />

        <i class="fa fa-search search-icon" aria-hidden="true"></i>
      </div>

      <div class="sort-filter-div">
        <button class="sort-button" onClick={() => setOpenSort(!openSort)}>
          Sort By
          <i class="fa fa-sort sort-icon"></i>
        </button>
        {openSort ? displaySortOptions() : null}
        <button
          class="filter-button"
          onClick={() => setOpenFilter(!openFilter)}
        >
          Filter
          <i class="fa fa-filter sort-icon" aria-hidden="true"></i>
        </button>
        {openFilter ? displayFilterOptions() : null}
      </div>
    </div>
  );
}

export default FilterSearch;
