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
  }
  let newTuit;
  // setup test before running test
  beforeAll(() => {
    return createUser(ripley);
  })

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    deleteTuit(newTuit._id)
    return deleteUsersByUsername(ripley.username);
  })

  test('can create tuit with REST API', async () => {
    // insert new tuit in the database
    const newUser = await createUser(ripley)
    newTuit = await createTuit(newUser._id, ripleyTuit);

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
    const newUser = await createUser(ripley)
    newTuit = await createTuit(newUser._id,testTuit);
    return newTuit;
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(ripley.username);
  });

  test('can delete tuits from REST API', async () => {
    // delete a user by their username. Assumes user already exists
    const status = await deleteTuit(newTuit._id);

    // verify we deleted at least one user by their username
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);

});
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const bird = {
    username: 'hummingbird',
    password: 'hummmmmm',
    email: 'hbird@birds.com'
  };

  const testTuit = {
    tuit: 'Testing find tuit by id!',
  };

  let newTuit;
  // setup before running test
  beforeAll(async() => {
    const newUser = await createUser(bird)
    // insert new tuit in the database
    newTuit = await createTuit(newUser._id,testTuit)
    return newTuit
  });

  // clean up after ourselves
  afterAll(() => {
    // remove any data we inserted
    deleteUsersByUsername(testTuit.username)
    return deleteTuit(newTuit._id)
  });

  test('can retrieve tuits from REST API with primary key', async () => {
    
    // verify new tuit to match parameter tuit
    expect(newTuit.tuit).toEqual(testTuit.tuit);

    // retrieve tuit by primary key
    const existingTuit = await findTuitById(newTuit._id);
    expect(existingTuit.tuit).toEqual(testTuit.tuit);

});


});

describe('can retrieve all tuits with REST API', () => {
  // sample tuits we'll insert to then retrieve
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };
  
  const tuitTests = [
    "tuit1", "tuit2", "tuit3"
  ];

  // setup data before test
  beforeAll(async() => {
    const newUser = await createUser(ripley)
    // insert several tuits
    tuitTests.map(tuit =>
      createTuit(newUser._id,{tuit})
    )
  }
  );

  //clean up after ourselves
  afterAll(() =>
    // delete the users we inserted
    tuitTests.map(t =>
      deleteTuit(t._id)
    )
  );

  test('can retrieve all tuits from REST API', async () => {
    // retrieve all the tuits
    const tuits = await findAllTuits();

    // there should be a minimum number of tuits
    expect(tuits.length).toBeGreaterThanOrEqual(tuitTests.length);
  });
});