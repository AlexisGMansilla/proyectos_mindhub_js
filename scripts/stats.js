const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      backupEvents: [],
      eventsUpc: [],
      eventsPast: [],
      eventsUpcFiltred: [],
      eventsPastFiltred: [],
      categorys: [],
      filtrarHighAtt: {},
      filtrarLowAtt: {},
      filtrarLargerCapacity: {},
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
          this.currentDate = data.currentDate;

          this.eventsUpc = this.events.filter(
            (objeto) => objeto.date > this.currentDate
          );
          this.eventsPast = this.events.filter(
            (objeto) => objeto.date < this.currentDate
          );

          this.traerCategorias(this.events);
          this.categoryUpcEve();
          this.categoryPastEve();
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
    categoryUpcEve() {
      for (let i = 0; i < this.eventsUpc.length; i++) {
        let category = this.eventsUpc[i].category;
        let estimate = this.eventsUpc[i].estimate;
        let capacity = this.eventsUpc[i].capacity;
        let totalRev = this.eventsUpc[i].price * this.eventsUpc[i].estimate;
        let existeCategory = this.eventsUpcFiltred.findIndex(
          (item) => item.category === category
        );
        if (existeCategory === -1) {
          this.eventsUpcFiltred.push({
            category,
            estimate,
            capacity,
            totalRev,
          });
        } else {
          this.eventsUpcFiltred[existeCategory].totalRev += totalRev;
          this.eventsUpcFiltred[existeCategory].estimate += estimate;
          this.eventsUpcFiltred[existeCategory].capacity += capacity;
        }
      }
    },
    categoryPastEve() {
      for (let i = 0; i < this.eventsPast.length; i++) {
        let category = this.eventsPast[i].category;
        let assistance = this.eventsPast[i].assistance;
        let capacity = this.eventsPast[i].capacity;
        let totalRev = this.eventsPast[i].price * this.eventsPast[i].assistance;
        let existeCategory = this.eventsPastFiltred.findIndex(
          (item) => item.category === category
        );
        if (existeCategory === -1) {
          this.eventsPastFiltred.push({
            category,
            assistance,
            capacity,
            totalRev,
          });
        } else {
          this.eventsPastFiltred[existeCategory].totalRev += totalRev;
          this.eventsPastFiltred[existeCategory].assistance += assistance;
          this.eventsPastFiltred[existeCategory].capacity += capacity;
        }
      }
    },
  },
  computed: {
    eventsPerAttendance() {
      let porcentajes = this.eventsPast.map((obj) => {
        let porcentaje = (obj.assistance * 100) / obj.capacity;
        return { ...obj, porcentaje };
      });
      let mayorPorcentaje = porcentajes.reduce(
        (mayor, obj) => {
          return obj.porcentaje > mayor.porcentaje ? obj : mayor;
        },
        { porcentaje: -Infinity }
      );
      this.filtrarHighAtt = mayorPorcentaje;

      let menorPorcentaje = porcentajes.reduce(
        (menor, obj) => {
          return obj.porcentaje < menor.porcentaje ? obj : menor;
        },
        { porcentaje: Infinity }
      );
      this.filtrarLowAtt = menorPorcentaje;

      let capacidadMaxima = this.events.reduce((maximo, objeto) => {
        return objeto.capacity > maximo ? objeto.capacity : maximo;
      }, 0);
      this.events.forEach((card) => {
        if (card.capacity >= capacidadMaxima) {
          this.filtrarLargerCapacity = card;
        }
      });
    },


  },
});

app.mount("#app");
