<template>
  <div class="single-product">
  	<div v-if="loaded">
	   	<h3>Car details</h3>
	   	<div class="card">
	      <div class="card-header">
	        Car Details
	      </div>
	      <div class="card-body">
	      	<p >Brand: {{carBrand}}</p>
					<p >Color: {{carColor}}</p>
					<p >Year: {{carYear}}</p>
					<p >Model: {{carModel}}</p>
					<p >Mileage: {{carMileage}}</p>


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
  name: 'CarDetails',
  data () {
    return {
    	carBrand: '',
			carColor: '',
			carYear: '',
			carModel: '',
			carMileage: '',

    	loaded: false
    }
  },
  beforeCreate (){

	var docRef = db.collection('cars').doc(this.$route.params.id);
	docRef.get().then((doc)=> {
	    if (doc.exists) {
	        console.log("Document data:", doc.data().car_brand);
					//this.carData.id = doc.data().id
					this.carBrand = doc.data().car_brand
					this.carColor = doc.data().car_color
					this.carYear  = doc.data().car_year
					this.carModel = doc.data().car_model
					this.carMileage= doc.data().car_mileage

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
