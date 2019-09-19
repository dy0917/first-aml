<template>
  <div class="container">
    <div class="row">
      <Entity companyId="1" />
    </div>
  </div>
</template>

<script>
import Entity from "../components/Entity";
export default {
  name: "NewCompany",
  components: {
    Entity
  },
  data() {
    return {
      companies: [
        {
          id: "123",
          individuals: [
            {
              name: "Mary Smith",
              type: "Director",
              share: null
            },
            {
              name: "Joe Bloggs",
              type: "Shareholder",
              share: 25
            },
            {
              name: "Joe Bloggs",
              type: "Shareholder",
              share: 25
            },
            {
              name: "XYZ",
              type: "Trust",
              share: 50
            }
          ]
        }
      ]
    };
  }
};
</script>
