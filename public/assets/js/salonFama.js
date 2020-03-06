Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    editName: String,
    editRouterParams: String,
    deleteData: Function
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})
new Vue({
  mounted(){
    this.inicializar();
  },
  el: '#app',
  template: '#main',
  data() {
    return {
      datos: [],
      gridColumns:['_id', 'avatar', 'correo', 'nombre'],
      searchQuery: '',
      titulo: 'Salon de la Fama'
    };
  },
  methods:{
    inicializar(){
      var bBuscar = s('.bBuscar')[0];
      var bAtras = s('.div-busqueda .bAtras')[0];
      bBuscar.addEventListener('click',function(e){
        var divBusqueda = s('.div-busqueda')[0];
        divBusqueda.classList.remove('oculto');
        setTimeout(function(){
          //crecimiento del fondo de la busqueda ... 
          var fondo = s('.div-busqueda .fondo')[0];
          fondo.style.transform="scale3d(1,1,1)";
          setTimeout(function(){
            s('.contenido')[0].classList.remove('oculto');
            s('.tSearch')[0].focus();
          },200)
        },20);
      });
      bAtras.addEventListener('click', function(e){
        var fondo = s('.div-busqueda .fondo')[0];
        s('.contenido')[0].classList.add('oculto');
        fondo.style.transform="scale3d(0,0,0)";
        setTimeout( function(){
          var divBusqueda = s('.div-busqueda')[0];
          divBusqueda.classList.add('oculto');
        },250);
      });
      this.cargarLoremData();
    },
    cargarLoremData(){
      var url = "https://noesishosting.com/sw/loremdata/index.php?a=rs&p=nombre,avatar,correo:7"
      this.$http.get(url).then(function(rslt){
      this.$data.datos = JSON.parse(rslt.data).rs;
      }, function(e){
        console.log(e);
      });
    }
  }
});