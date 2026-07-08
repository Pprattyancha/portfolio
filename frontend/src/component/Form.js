const initialForm = {
  company: "",
  role: "",
  duration: "",
  description: "",
  tech: "",
};

const [form, setForm] = useState(initialForm);

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};