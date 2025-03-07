import Parse from "parse";


// READ operation - get all lessons in Parse class Lesson
export const getAllCharacters = () => {
    const Char = Parse.Object.extend("Character");
    const query = new Parse.Query(Char);
    return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
    });

};
