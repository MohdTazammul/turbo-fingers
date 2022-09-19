var paragraphs = 
{
    General:[
        ["A Snake Charmer", "A snake charmer is a person who moves the streets with different types of the banks of the river yamuna. It is snakes in his basket. He goes from one place to another to show various types of snakes and their tricks. He carries a pipe with which he plays music and snakes dance to his tune. He usually wears a colourful dress. The job of a snake charmer is quite dangerous. Some snakes are quite poisonous and can even bite him. It is not an easy task to catch and train them for the shows."],
    
        ["The bird I like most", "The bird I like most is the parrot. The parrot is a very beautiful bird. Its feathers are green. It has a red beak. Its beak is curved. Round the neck of a parrot there are black rings. Overall it is a lovely looking bird. It eats grains, fruits, leaves seeds, pears, nuts, mangoes and boiled rice etc. The Parrot is a talking bird. It can imitate the human voice. It is found in almost all the warm countries. It generally lives in the hollows of trees. Some people keep it in a small cage which is not good. Some people train parrots to do wonderful things."],
        
        ["Street Begger", "A street beggar can be seen everywhere; at the bus stop, railway stations, religious places, markets etc. Some beggars are crippled, lame and some are blind. They are unable to earn their livelihood. Whereas some are healthy and they do not deserve our sympathy. We should see that they take up some profession. They should not be allowed to beg. On my way to school I see a beggar daily. He wears old rags. He is partially blind. I feel pity seeing him but I can't help it I can only pray to God to help him to earn his livelihood."]
    ],
    React:
    [
        ['Create React Application', 'Facebook has created a Create React Application with everything you need to build a React app. It is a a development server that uses Webpack to compile React, JSX, and ES6, auto-prefix CSS files. The Create React App uses ESLint to test and warn about mistakes in the code. To create a Create React App run the following command on your terminal "create-react-app myProject". Make sure you have installed create-react-app command globally in your system, otherwise you need to install it first.'],

        ["What is React Component?", 'Components are rightly defined as the essential building blocks of any application created with React, and a single app most often consists of many components. A component is in essence, a piece of the user interface - splitting the user interface into reusable and independent parts, each of which can be processed separately. We can reuse a component used in one area of the application in another area. This speeds up development and helps avoid cluttering of code. A component can contain within itself, several more components.  This helps in creating more complex design and interaction elements.'],
        
        ["What is Redux", `Redux is a predictable state container for JavaScript applications. It helps you write apps that behave consistently, run in different environments (client, server, and native), and are easy to test. Redux manages an application's state with a single global object called Store. Redux is a state management tool. Redux can be used with any JavaScript framework or library. Redux stores the state of the application, and the components can access the state from a state store. The state of your whole application is stored in an object tree within a single store. The only way to change the state is to initiate an action, an object describing what happened.`]
    ],
    testing:["What is HTMl", "html is markup language."]
}

var getContent = () =>
{
    var keys = Object.keys(paragraphs)
    var key = keys[Math.floor(Math.random() * keys.length)];
    var data  = paragraphs[key][Math.floor(Math.random() * paragraphs[key].length)]
    // return data;
    return paragraphs.testing
}
export default getContent