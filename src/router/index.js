import Vue from 'vue'
import Router from 'vue-router'
import Cars from '@/components/Cars'
import CarDetails from '@/components/CarDetails'
import RentalDetails from '@/components/RentalDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cars',
      component: Cars
    },
    {
      path: '/cars/:id',
      name: 'CarDetails',
      component: CarDetails
    },
    {
      path: '/cars/:carId/rentals/:rentalId',
      name: 'RentalDetails',
      component: RentalDetails
    }
  ]
})
