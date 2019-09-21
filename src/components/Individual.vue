<template>
  <div>
    <template v-if="individual.isEdit">
      <div class="form-group row">
        <label
          for="staticEmail"
          class="col-sm-2 col-form-label"
          v-bind:class="{'text-danger': $v.formData.name.$error}"
        >Name</label>
        <div class="col-sm-10">
          <input
            v-model="formData.name"
            placeholder="Name"
            class="form-control"
            v-bind:class="{'is-invalid': $v.formData.name.$error}"
          />
        </div>
      </div>
      <div class="form-group row">
        <label
          for="staticEmail"
          class="col-sm-2 col-form-label"
        >Share</label>
        <div class="col-sm-10">
          <input
            type="number"
            v-model="formData.share"
            placeholder="Share"
            class="form-control"
          />
        </div>
      </div>
      <div class="form-group row">
        <label
          for="type"
          class="col-sm-2 col-form-label"
          v-bind:class="{'text-danger': $v.formData.type.$error}"
        >Type</label>
        <div class="form-check">
          <input type="radio" value="director" v-model="formData.type" />
          <label class="form-check-label" for="director">Director</label>
        </div>
        <div class="form-check">
          <input type="radio" value="shareholder" v-model="formData.type" />
          <label class="form-check-label" for="shareholder">Shareholder</label>
        </div>
        <div class="form-check">
          <input type="radio" value="trust" v-model="formData.type" />
          <label class="form-check-label" for="trust">Trust</label>
        </div>
      </div>
      <div class="row">
        <button class="btn btn-danger" v-on:click="removeIndividual">Delete</button>
      </div>
    </template>
    <template v-else>
      {{individual.name}} ({{individual.type}})
      <template
        v-if="individual.share"
      >({{individual.share}}% Share)</template>
      <button class="btn btn-secondary" v-on:click="editIndividual">Edit</button>
    </template>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Individual",
  props: {
    individual: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: this.$props.individual.name,
        share: this.$props.individual.share,
        type: this.$props.individual.type
      }
    };
  },
  validations: {
    formData: {
      name: {
        required
      },
      type: {
        required
      }
    }
  },

  methods: {
    removeIndividual() {
      this.$store.dispatch("individuals/removeIndividual", {
        individual: this.individual
      });
    },
    editIndividual() {
      this.$store.dispatch("individuals/updateIndividual", {
        individual: { ...this.individual, ...{ isEdit: true } }
      });
    },
    validate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("individuals/updateIndividual", {
          individual: { ...this.individual, ...this.formData }
        });
      }
      return !this.$v.$invalid;
    }
  }
};
</script>
