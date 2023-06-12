import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
    return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('react-root'));
root.render(<HelloMessage name="Taylor" />);