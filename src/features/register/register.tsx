import { Button, Container, Stack, TextField } from "@mui/material";
import { useIsOnline } from "../../hooks/useIsOnline";
import { get, set, update } from "../../services/keyval";
import { setItem, sync } from "../../services/firebase";
import { Item } from "../../types/list";

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  birthdate: HTMLInputElement;
}

interface RegisterFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const formatDate = (date: Date | null) => {
  if (date) {
    const day = date.getUTCDate() + 1;
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    return Date.UTC(year, month, day);
  }
  return 0;
};

const formatItem = (item: Item) => ({
  birthdate: item.birthdate,
  email: item.email,
  firstName: item.firstName,
  lastName: item.lastName,
});

const handleSubmit = async (
  e: React.FormEvent<RegisterFormElements>,
  isOnline: boolean,
) => {
  e.preventDefault();
  e.stopPropagation();
  const form = e.currentTarget.elements;

  const item = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    birthdate: formatDate(form.birthdate.valueAsDate),
  };
  try {
    if (isOnline) {
      await setItem(item);
    }
    const items = await get("items");
    await update("items", [
      ...items,
      {
        ...item,
        ...(!isOnline && { isNotSync: true }),
      },
    ]);
  } catch {
    set("items", [
      {
        ...item,
        ...(!isOnline && { isNotSync: true }),
      },
    ]);
  }
};

const handleSync = async () => {
  try {
    const items = await get("items");
    sync(items.filter((item) => item.isNotSync).map(formatItem)).then(
      async () => {
        await update("items", items.map(formatItem));
      },
    );
  } catch (e) {
    console.error(e);
  }
};

const Register = () => {
  const isOnline = useIsOnline();
  return (
    <Container sx={{ marginTop: "100px" }}>
      {
        <form
          onSubmit={(e: React.FormEvent<RegisterFormElements>) =>
            handleSubmit(e, isOnline)
          }
        >
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              name="firstName"
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              name="lastName"
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            name="email"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="Date of Birth"
            name="birthdate"
            fullWidth
            required
            sx={{ mb: 4 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="secondary" type="submit">
            Register
          </Button>
          {isOnline && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ marginLeft: "8px" }}
              onClick={() => handleSync()}
            >
              SYNC
            </Button>
          )}
        </form>
      }
    </Container>
  );
};

export default Register;
