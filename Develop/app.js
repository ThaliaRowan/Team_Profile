const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var employees = [];

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your team manager?'
    },
    {
        type: 'input',
        name: 'email',
        message: "hat is your team manager's email address?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your manager's id?"
    },

    {
        type: 'input',
        name: 'officeNum',
        message: "What is your manager's office number?"
    }
    
    
]).then(function(managerAns){
    var newManager = new Manager(managerAns.name, managerAns.id, managerAns.email, managerAns.officeNum );
    employees.push(newManager)

}).then(function(){
    userChoice()

})

function userChoice(){

    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Would you like to add more members to the team?',
            choices: [{name:'Engineer', value: 0}, {name:'Intern', value: 1}, {name:'I do not want to add anymore members.', value: 2}]
        }
    ]).then(function(res){
        userEngineer(res);
    });
    
} 
        
    function userEngineer(res){
        if(res.employee == 0 ){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'engineer',
                    message:'What is the name of this enginner?'
                },
                {
                            
                    type: 'input',
                    name: 'email',
                    message: "What is the engineer's email address?"
                },
                {
                    type: 'input',
                    name: 'id',
                    message: "What is the engineer's id?"
                },
                {
                    type: 'input',
                    name: 'github',
                    message: "What is the engineer's github?"
                },
            ]).then(function(EngineerAns){
            var newEngineer = new Engineer(EngineerAns.engineer, EngineerAns.id, EngineerAns.email, EngineerAns.github );
            employees.push(newEngineer)
        
        }).then(function(){
                userChoice();
            })
        }
        else if(res.employee == 1){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'intern',
                    message:'What is the name of this intern?'
                },
                {
                            
                    type: 'input',
                    name: 'email',
                    message: "What is the intern's email address?"
                },
                {
                    type: 'input',
                    name: 'id',
                    message: "What is the intern's id?"
                },
                {
                    type: 'input',
                    name: 'school',
                    message: "What is the intern's school name?"
                },
            ]).then(function(InternAns){
            var newIntern = new Intern(InternAns.intern, InternAns.id, InternAns.email, InternAns.school );
            employees.push(newIntern)
        
        }).then(function(){
                userChoice();
            })
        } else if(res.employee == 2){
            genratehtml();
        }
    
    }


   




function genratehtml(){
    var finishedhtml = render(employees)
   console.log(finishedhtml);
   fs.writeFile(outputPath,finishedhtml, function(err){
       if(err){
           console.log(err)
       }
       console.log('success');
   })
}



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!




// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
