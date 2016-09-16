/* Paige Brinks, plb7
 * September 14, 2016
 *
 * Lab 02, 
 * Build an object prototype for a person 
 * and an object prototype for a student that inherits the features of the person class
 */


// Person Object
function Person(firstName, lastName, birthDate, friends, greeting) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.birthDate = new Date(birthDate);
	this.friends = friends;
	this.greeting = greeting;
}

// change Person's name
Person.prototype.newName = function(newFirstName, newLastName) {
	this.firstName = newFirstName;
	this.lastName = newLastName;
}

// return age of Person
Person.prototype.getAge = function() {
	var today = new Date();
	var age = today.getFullYear() - this.birthDate.getFullYear();
	var m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
        age--;
    }
    return age;
}

// add a friend to Person's friend list
Person.prototype.newFriend = function(friend) {
	this.friends.push(friend);
}

// Print Person's greeting
Person.prototype.printGreeting = function() {
	document.write(this.greeting.concat(", I am a person."));
}



// Student object - inherits from Person
function Student(firstName, lastName, birthDate, friends, greeting, major) {
	Person.call(this, firstName, lastName, birthDate, friends, greeting);
	this.major = major;
}
Student.prototype = Object.create(Person.prototype);

// print Student's greeting
Student.prototype.printStudentGreeting = function() {
	document.write(this.greeting.concat(", I am a student."));
}

//test Person
var me = new Person("Paige", "Brinks", "1994/11/07", [], "Hello there");
var P1 = new Person("Lydia", "Cupery", "2000/03/01", [me], "Merhaba");
var P2 = new Person("Lisa", "Terwilliger", "1995/03/27", [me, P2], "Goodbye");

console.log(me);
console.log(me.firstName.concat(" ", me.lastName));
me.newName("egiap", "sknirb");
console.log(me.firstName.concat(" ", me.lastName));
var myAge = me.getAge();
console.log(myAge);
console.log(P1.getAge());
me.printGreeting();
document.write('\n');
P1.printGreeting();
document.write('\n');
P2.printGreeting();
document.write('\n');
me.newFriend(P1);
me.newFriend(P2);
console.log(me.friends);


// Test Student
var S1 = new Student("Jane", "Doe", "1988/10/17", [me, P1, P2], "Hello", "Computer Science");
var S2 = new Student("Grant", "Van Dyke", "2001/09/21", [S1, P1], "Hey", "German");

console.log(S1);
console.log(S2);
S1.newName("Hello", "World");
console.log(S1.firstName.concat(" ", S1.lastName));
console.log(S2.getAge());
S2.newFriend(P2);
console.log(S2.friends);
S1.printStudentGreeting();
document.write('\n');
S2.printStudentGreeting();
console.log(P1 instanceof Person);	// true
console.log(S2 instanceof Student);	// true
console.log(P2 instanceof Student);	// false
console.log(S2 instanceof Person);	// true
