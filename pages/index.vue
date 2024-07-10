<template>
  <div>
    <div class="select-tree-wrapper">


      <div class="selcts-left-wrapper">
        <div class="select-wrapper-left">
          <div class="select-wrapper-left-search">
            <img src="../assets/images/search.svg" alt="search icon" />
            <input
              class="left-search-input"
              type="text"
              placeholder="Type to choose"
              v-model="searchQuery"
            />
          </div>
  
          <section>
            <div
              class="select-left-wrapper-cheked-wrapp"
              v-for="(category, index) in filteredCategories"
              :key="index"
            >
              <div class="select-left-wrapper-cheked">
                <input
                  class="cheked-input"
                  type="checkbox"
                  :id="`check-${index}`"
                  @change="toggleParent(category, index)"
                />
                <label class="cheked-lebel" :for="`check-${index}`">{{
                  category.name
                }}</label>
                <img
                  class="cheked-img"
                  :class="{ change: store.selectopen }"
                  src="../assets/images/frame.svg"
                  alt="frame"
                  @click="toggleopen(index)"
                />
              </div>
  
              <ul class="select-left-cheked-two-list" id="tree">
                <li
                  class="select-left-wrapper-cheked-two"
                  v-for="item in category.slects"
                  :key="item.id"
                  :data-value="item.id"
                  @click="selectItem(item, index)"
                >
                  <input
                    :class="`cheked-two-input child check-item-${index}`"
                    type="checkbox"
                    :id="item.id"
                    v-model="childrenChecked[item.id]"
                    @change="toggleChild()"
                  />
                  <label class="cheked-two-lebal" :for="item.id">{{
                    item.name
                  }}</label>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div class="select-wrapper-right" id="selected-items">
        <div class="select-right">
          <section
            v-for="selected in selectedItems"
            :key="selected.id"
            :data-value="selected.id"
            class="selected-item"
            @click="deselectItem(selected)"
          >
            <p>{{ selected?.name }}</p>
            <img src="../assets/images/x.svg" alt="delete" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from '~/store/store';

const store = useStore();

const selectscheked = [
  {
    name: "Nature",
    slects: [
      { id: 0, name: "Beaches" },
      { id: 1, name: "Parks" },
      { id: 2, name: "Aquarium & Oceanarium" },
      { id: 3, name: "Zoos & Sanctuaries" },
      { id: 4, name: "Gardens" },
      { id: 5, name: "Caves & Underground places" },
      { id: 6, name: "Nature reserves" },
      { id: 7, name: "Botanical Gardens" },
      { id: 8, name: "Volcanos" },
      { id: 9, name: "Mountains" },
      { id: 10, name: "Lakes" },
    ],
  },
  {
    name: "Culture",
    slects: [
      { id: 11, name: "Norms" },
      { id: 12, name: "Symbols" },
      { id: 13, name: "Language" },
      { id: 14, name: "Artifacts" },
      { id: 15, name: "Rituals" },
      { id: 16, name: "Values" },
      { id: 17, name: "Beliefs" },
      { id: 18, name: "Individualism in the United States" },
      { id: 19, name: "References" },
    ],
  },
  {
    name: "Health & Beauty",
    slects: [
      { id: 20, name: "Makeup" },
      { id: 21, name: "Nail care, manicure & pedicure" },
      { id: 22, name: "Bath & body" },
      { id: 23, name: "Hair care & styling" },
      { id: 24, name: "Skin care" },
      { id: 25, name: "Fragrances" },
      { id: 26, name: "Vision care" },
      { id: 27, name: "Shaving & hair removal" },
      { id: 28, name: "Health care" },
      { id: 29, name: "Oral care" },
    ],
  },
  {
    name: "Love & Romance",
    slects: [
      { id: 30, name: "Date Night Journals." },
      { id: 31, name: "Huggable Love Letter." },
      { id: 32, name: "Digital Love Notes" },
      { id: 33, name: "Sentimental Star Map" },
      { id: 34, name: "Skin care" },
      { id: 35, name: "Fragrances" },
      { id: 36, name: "Meaningful Necklace" },
      { id: 37, name: "Romantic Mapmaking Class." },
      { id: 38, name: "Matching Underwear Subscription" },
      { id: 39, name: "Dazzling Pavé Ring" },
    ],
  },
  {
    name: "Food & Drinks",
    slects: [
      { id: 40, name: "Lactose-free" },
      { id: 41, name: "Nut-free" },
      { id: 42, name: "Vegan/Vegetarian" },
      { id: 43, name: "Bottled" },
      { id: 44, name: "Canned" },
      { id: 45, name: "Chilled" },
      { id: 46, name: "Dried" },
      { id: 47, name: "Fresh" },
      { id: 48, name: "Frozen" },
      { id: 49, name: "Baking mixes" },
    ],
  },
];

const searchQuery = ref('');

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return selectscheked;
  }
  const query = searchQuery.value.trim().toLowerCase();
  return selectscheked.filter(category =>
    category.name.toLowerCase().includes(query)
  );
});

const toggleopen = (index) => {
  document
    .querySelectorAll(".select-left-cheked-two-list")
    .forEach((el, idx) => {
      if (index == idx) {
        el.classList.toggle("open");
      } else {
        el.classList.remove("open");
      }
    });
  document.querySelectorAll(".cheked-img").forEach((el, idx) => {
    if (index == idx) {
      el.classList.toggle("change");
    } else {
      el.classList.remove("change");
    }
  });
};

const parentChecked = ref(false);
const childrenChecked = ref([]);

const toggleParent = (category, index) => {
  category.slects.forEach(item => {
    const el = document.getElementById(item.id);
    el.checked = document.getElementById(`check-${index}`).checked;
    const findItem = selectedItems.value.find(selected => selected.id === item.id);
    if (!findItem) {
      selectedItems.value.push(item);
    } else {
      const index = selectedItems.value.indexOf(item);
      selectedItems.value.splice(index, 1);
    }
  });
};

const toggleChild = () => {
  // Toggle child functionality remains as per your existing code
};

const selectedItems = ref([]);

const selectItem = (item, index) => {
  document.querySelectorAll(`.check-item-${index}`).forEach(el => {
    if (el.checked) {
      document.getElementById(`check-${index}`).checked = true;
    } else {
      document.getElementById(`check-${index}`).checked = false;
    }
  });
  const findItem = selectedItems.value.find(selected => selected.id === item.id);
  if (!findItem) {
    selectedItems.value.push(item);
  } else {
    const index = selectedItems.value.indexOf(item);
    selectedItems.value.splice(index, 1);
  }
};

const deselectItem = (item) => {
  const index = selectedItems.value.indexOf(item);
  selectedItems.value.splice(index, 1);
  document.getElementById(item.id).checked = false;
};

onMounted(() => {
  const tree = document.getElementById("tree");
  const selectedItemsContainer = document.getElementById("selected-items");

  tree.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const id = event.target.getAttribute("data-value");
      const item = selectscheked.flatMap(category => category.slects).find(el => el.id === id);
      selectItem(item);
      event.target.classList.add("selected");
    }
  });

  selectedItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("selected-item")) {
      const id = event.target.getAttribute("data-value");
      const item = selectedItems.value.find(el => el.id === id);
      deselectItem(item);
      const treeItem = tree.querySelector(`li[data-value="${item.id}"]`);
      treeItem.classList.remove("selected");
      event.target.remove();
    }
  });
});
</script>

<style lang="scss">
// Your styles remain as per your existing code
</style>
