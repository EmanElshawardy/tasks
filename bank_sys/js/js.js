const   addUserForm         = document.querySelector('#addUserForm')
        allUsersForm        = document.querySelector('#allUsersForm')
        userName            = document.querySelector('#userName'),
        city            = document.querySelector('#city'),
        street            = document.querySelector('#street'),
        building            = document.querySelector('#building'),
        userBalance         = document.querySelector('#userBalance'),
        addUser             = document.querySelector('#addUser')
        addBalanace         = document.querySelector('#addBalanace'),
        withdrawBalanace    = document.querySelector('#withdraw'),
        tBody               = document.querySelector('#usersList'),
        usersArray          = fetchUsersFromLocalStorage('usersArray') ? fetchUsersFromLocalStorage('usersArray') : []

/* Methods */

//Add to Local
const addUsersToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//Fetch from Local
function fetchUsersFromLocalStorage(data){
    let stringData    = localStorage.getItem(data)
    if(stringData){
         usersArray = JSON.parse(stringData)
         return usersArray
    }
}

//Create table row
// <td>${user.cityValue}</td>
//<td>${user.buildingValue}</td>
//<td>${user.streetValue}</td>
//<td>${user.balanceValue}</td>
const createUsersRow = (user) => {
    
    return       `<tr>
                    <th scope="row">${user.id}</th>
                        <td>${user.nameValue}</td>
                        
                        <td>
                            <input type="submit" value="Add" class="btn btn-success" id= "addBalanace" onclick="addUsersBalance(${user.balanceValue}, ${user.id})">
                            <input type="submit" value="Withdraw" class="btn btn-primary" onclick="withdrawUserBalance(${user.balanceValue}, ${user.id})">
                            <input type="submit" value="Show" id="show" class="btn btn-warning"onclick="Show(${user.balanceValue})">
                    </td>
                </tr>`
}

      
const Show = user => {

    alert(JSON.stringify( user.balanceValue))
    // console.log(`${user}`)
    // createTableWithFetchedUsers() 
}
//Adding Balanace
const addUsersBalance = (balanceValue, id) => {

    let num    = window.prompt('Please Add Your Balance')

    if ( Number(num)>=100 && Number(num)<=  6000  ) {
        balanceValue   += Number(num)

        usersArray = usersArray.map( user => {
            if (user.id === id) {
                user.balanceValue = balanceValue
                return user
            } else{
                return user
            }            
        }) 
        addUsersToLocalStorage('usersArray', usersArray)
        createTableWithFetchedUsers()

    } else {
        input = window.alert('your balance should be more than 100 and less than or equal 6000 ')
        console.log(balanceValue += Number(num))
        
    }
}

//Withdrawing Balance
const withdrawUserBalance = (balanceValue, id) => {
    
    let num    = window.prompt('Please Add Your Balance')

    if ( Number(num)>=100 && Number(num)<= balanceValue  ) {
        balanceValue   -= Number(num)

        usersArray = usersArray.map( user => {
            if (user.id === id) {
                user.balanceValue = balanceValue
                return user
            } else{
                return user
            }            
        }) 
        addUsersToLocalStorage('usersArray', usersArray)
        createTableWithFetchedUsers()

    } else {
        input = window.alert('your balance should be more than 100 and less than or equal balance  ')
        console.log(balanceValue -= Number(num))
        
    }
}

     
// const show = data => {
//     // console.log(usersArray)
//     for(item in data){

//     }
//     window.location.replace("show.html");
//     createTableWithFetchedUsers() 
// }

//Create Dynamic Rows
function createTableWithFetchedUsers() {
    tBody.innerHTML =''
    let fetchedUsers = fetchUsersFromLocalStorage('usersArray')
    // console.log(fetchedUsers)
    fetchedUsers.map(user=> tBody.innerHTML += createUsersRow(user) )
}


/**Event Handlers */

//Home page Adding user
if (addUserForm) {
        addUser.addEventListener('click', function (e) {
            e.preventDefault()
            let id              = Date.now(),
                nameValue       = userName.value,
                cityValue       = city.value,
                streetValue    = street.value
                buildingValue       = building.value,
                balanceValue    = userBalance.value
                
                userObject = {id, nameValue, balanceValue,
                    address:{cityValue,streetValue,buildingValue},
                    transactions: []
                }
            
            // const userObject = {
            //     nameValue: this.elements.userName.value,
            //     balanceValue: this.elements.userBalance.value,
            //     id: Date.now(),
            //     address: {
            //         cityValue: this.elements.city.value,
            //         streetValue: this.elements.street.value,
            //         buildingValue: this.elements.building.value,
            //     },
            //     transactions: []
            // }

            if ( balanceValue >= 0 ) {
                usersArray.push(userObject )
                addUsersToLocalStorage( 'usersArray', usersArray )
                setTimeout( () => window.location.replace("addUser.html"), 500 )
            } 

            
    })
}

//Internal Page modifying users
if (allUsersForm) {
    createTableWithFetchedUsers()
}
