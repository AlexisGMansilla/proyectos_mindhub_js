const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      backupEvents: [],
      texto: "",
      categorys: [],
      categorysSeleccionadas: [],
    };
  },
  created() {
    this.traerDatos();
  },
  mounted() {},
  methods: {
    traerDatos() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((data) => {
          this.events = data.events;
          this.backupEvents = this.events;
          this.traerCategorias(this.events);
        })
        .catch((error) => console.log(error.message));
    },
    traerCategorias(arr) {
      arr.forEach((element) => {
        if (!this.categorys.includes(element.category)) {
          this.categorys.push(element.category);
        }
      });
    },
  },
  computed: {
    filtrarTodo() {
      let PrimerFiltro = (this.events = this.backupEvents.filter((events) =>
        events.name.toLowerCase().includes(this.texto.toLowerCase())
      ));
      if (this.categorysSeleccionadas.length > 0) {
        this.events = PrimerFiltro.filter((events) =>
          this.categorysSeleccionadas.includes(events.category)
        );
      } else {
        this.events = PrimerFiltro;
      }
    },
  },
});

app.mount("#app");