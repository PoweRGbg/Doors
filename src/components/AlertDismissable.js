import {useState} from "react";
import {Alert } from "react-bootstrap";

export default function AlertDismissable({text}) {
    const [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)}>
          <Alert.Heading>Nothing found!</Alert.Heading>
          <p>
            {text}
          </p>
        </Alert>
      );
    }
    return <>< />;
  }