import {
  createTuit, deleteTuit, findAllTuits, findTuitById
} from "../services/tuits-service"
import { createUser, deleteUsersByUsername } from "../services/users-service";

describe('can create tuit with REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const ripleyTuit = {
    tuit: 'Testing creating tuit!',
    postedBy: ripley.username
  }

  // setup test before running test
  beforeAll(() => {
    return createUser(ripley.username);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(ripley.username);
  })

  test('can create tuit with REST API', async () => {
    // insert new tuit in the database
    const newTuit = await createTuit(ripleyTuit);

    // verify inserted tuit's properties match parameter tuit
    expect(newTuit.tuit).toEqual(ripleyTuit.tuit);
  });

});

describe('can delete tuit wtih REST API', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  const testTuit = {
    tuit: 'Testing deleting tuit!',
    postedBy: ripley.username
  };
  let newTuit;
  // setup the tests before verification
  beforeAll(async() => {
    newTuit = await createTuit(testTuit);
    return newTuit;
  });

  // clean up after test runs
  // afterAll(() => {
  //   // remove any data we created
  //   return deleteTuit(newTuit._id);
  // });

  test('can delete tuits from REST API', async () => {
    // delete a user by their username. Assumes user already exists
    const status = await deleteTuit(newTuit._id);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);


});
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});