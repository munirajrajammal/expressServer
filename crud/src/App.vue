<template>
<div id="app" class="small-container">
  <h1>Employees</h1>
  <!-- <employee-table/> -->
  <employee-form @add:employee="addEmployee"/>
  <!-- <employee-table :employees="employees"/> -->
  <employee-table :employees="employees"   @delete:employee="deleteEmployee" @edit:employee="editEmployee" />
  
</div>
</template>
<script>
import EmployeeForm from  '@/components/EmployeeForm.vue'     
import EmployeeTable from '@/components/EmployeeTable.vue'   



export default {
  name:'app',
  components:{  
    EmployeeTable,EmployeeForm,
  },  
  
methods:{
      addEmployee(employee) {
          console.log('inside add')
          const lastId = (this.employees.length > 0)? this.employees[this.employees.length - 1].id:0;
          const id = lastId + 1;
          const newEmployee = { ...employee, id };
          console.log(newEmployee)
          this.employees = [...this.employees, newEmployee];
},
     deleteEmployee(id) {
      this.employees = this.employees.filter(
      employee => employee.id !== id
    )
  },
  
      editEmployee(id, updatedEmployee) {
      this.employees = this.employees.map(employee =>
      employee.id === id ? updatedEmployee : employee
  )
}

},
  data(){
    return{
      employees:[
        {
          id:1,
          name:'sounder',
          email:'sounder@gmail.com'
        },
         {
          id:2,
          name:'ramu',
          email:'ramu@gmail.com'
        },
         {
          id:3,
          name:'dinesh',
          email:'dinesh@gmail.com'
        },
      ]
    }
  }
}
</script>

<style>
button{
  background:#009435;
  border: 2px solid #009435;
}
.small-container{
  max-width: 680px;
}
  
</style>