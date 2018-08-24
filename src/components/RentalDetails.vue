<template>
  <div class="single-product">
  	<div v-if="loaded">
	   	<h3>Rental details</h3>
	   	<div class="card">
	      <div class="card-header">
	        Your Rental
	      </div>
	      <div class="card-body">
	      	<p >Rental Start: {{rentalStart}}</p>
					<p >Rental End: {{rentalEnd}}</p>
					<p >Cost: {{rentalCost}}</p>

	        <router-link :to="'/'" class="btn btn-primary"> Back </router-link>
	      </div>
		</div>
    </div>
    <div v-else>
    	<h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
import db from '@/db'
export default {
  name: 'RentalDetails',
  data () {
    return {
			rentalStart: '',
			rentalEnd: '',
			rentalCost: '',

    	loaded: false
    }
  },
  beforeCreate (){

	var docRef = db.collection('cars').doc(this.$route.params.carId).collection('rentals').doc(this.$route.params.rentalId);
	docRef.get().then((doc)=> {
	    if (doc.exists) {
	        console.log("Document data:", doc.data());
					//this.carData.carId = doc.data().id
					this.rentalStart = doc.data().rental_start
					this.rentalEnd = doc.data().rental_end
					this.rentalCost  = doc.data().rental_cost


	        this.loaded = true
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

</style>
