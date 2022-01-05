// import { useEffect } from 'react';
 
export default function SensorValue({
    sgv,
    onClick,
}) {

    return (
        <li onClick={() => onClick(sgv.id)} >
          {sgv.dateString} - {sgv.sgv} - {sgv.direction}
        </li>
    );
}