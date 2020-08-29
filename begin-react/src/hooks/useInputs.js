import { useReducer, useState, useCallback } from 'react';

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESET':
      return action.initialState;
  }
  return state;
}
function useInputs(initialForm) {
  const [state, dispatch] = useReducer(formReducer, initialForm);
  const onChange = useCallback((e) => {
    dispatch({ type: 'CHANGE', name: e.target.name, value: e.target.value });
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET', initialState: initialForm });
  }, [initialForm]);
  return [state, onChange, reset];
}

export default useInputs;

// import { useState, useCallback } from 'react';

// function useInputs(initialForm) {
//   const [form, setForm] = useState(initialForm);
//   // change
//   const onChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((form) => ({ ...form, [name]: value }));
//   }, []);
//   const reset = useCallback(() => setForm(initialForm), [initialForm]);
//   return [form, onChange, reset];
// }

// export default useInputs;
