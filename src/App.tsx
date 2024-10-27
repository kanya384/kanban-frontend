


import { UseCasesContext } from "./context/useCases";

import { useUseCases } from "./hooks/useCasesHook";
import { useActions } from "./hooks/useActions";
import { RouterComponent } from "./ui/components/router";
import "./css/core.css"
import "./css/style.css"
import "./css/core-customized.css"
import "./css/theme-default.css"
import "./css/theme-default-c.css"
import "./css/demo.css"
import "./css/perfect-scrollbars.css"

function App() {
  let actions = useActions();
  let { authUseCase} = useUseCases(actions)

  return (
      <UseCasesContext.Provider value={{ authUseCase: authUseCase }}>
          <div className="App">
            <RouterComponent />
          </div>
      </UseCasesContext.Provider>
  );
}

export default App;
