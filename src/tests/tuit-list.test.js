import {Tuits} from "../components/tuits/index"
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

// jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
    render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
    const linkElement = screen.getByText(/webdev/i);
    expect(linkElement).toBeInTheDocument();
})
