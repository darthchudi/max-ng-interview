/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
function classifier(input) {
	var data = input;
	var students = [];
	var ages = [];
	var groups = {};
	var ages = [];
	var organizedGroups = {};
	var noOfGroups = '';

	//Extract Age
	data.map((student)=>{
		var dob = new Date(student.dob);
		var yob = dob.getFullYear();
		age = 2018 - yob;
		students.push({
			name: student.name,
			age: age,
			dob: student.dob,
			regNo: student.regNo
		});

		ages.push(age);
	});

	//Sort Students by Age
	students.sort((a, b)=>{
		return a.age - b.age;
	});

	//sort members
	var unsortedStudentsBucket = [];
	var sortedStudentsBucket = [];
	var counter = 1;

	var minAge = Math.min(...ages);
	var maxAge = Math.max(...ages);

	for(var i=minAge; i<=(maxAge*2); i+=5){
		students.forEach((student)=>{
			//Check if the student satisfies the condition for age difference being less than 5
			if(Math.abs(i - student.age) <= 5){
				//Check if the student has been sorted
				if(sortedStudentsBucket.indexOf(student.regNo) < 0 ){

					//Check if the group exists 
					if(! groups.hasOwnProperty([counter])){
						i = student.age;
						groups[counter] = {
							members: []
						}
						groups[counter].members.push(student);
						sortedStudentsBucket.push(student.regNo);
					}
					else {
						//Check if the bucket is full
						if(groups[counter].members.length !== 3 ){
							groups[counter].members.push(student);
							sortedStudentsBucket.push(student.regNo);	
						}
					}
				}
			}
		});
		counter++;
	}


	//Rename Group	
	var j = 1;
	var keys = Object.keys(groups)

	keys.forEach((key)=>{
		organizedGroups['group'+j] = groups[key];
		j++;
	});


	//Get Group Metadata
	var keys = Object.keys(organizedGroups);

	keys.forEach((key)=>{
		var ages = [];
		var sum = 0;
		var regNos = [];
		organizedGroups[key].members.forEach((member, index)=>{
			ages.push(member.age);
			sum+=member.age;
			var integerRegNo = parseInt(member.regNo);
			regNos.push(integerRegNo);
		});

		var oldest = Math.max(...ages);
		organizedGroups[key].oldest = oldest;
		organizedGroups[key].sum = sum;
		organizedGroups[key].regNos = regNos;
		organizedGroups[key].regNos.sort((a,b)=>{
			return a-b;
		});
	});
	noOfGroups = keys.length;

	//Finalize
	var finalData = organizedGroups;
	finalData.noOfGroups = noOfGroups;
	return finalData;
}

module.exports = classifier;
