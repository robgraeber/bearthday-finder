import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { render } from '@testing-library/react';

// This replicates the providers in _app.tsx.
const Providers: React.ComponentType = ({ children }) => {
  return <MuiPickersUtilsProvider utils={DateFnsUtils}>{children}</MuiPickersUtilsProvider>;
};

const customRender = (ui: JSX.Element, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
