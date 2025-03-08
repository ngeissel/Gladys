const VacbotDebugBox = ({ children, ...props }) => {
  const { debug, deviceFeatures = [] } = props;
  console.log(deviceFeatures);
    return (
      <div>
        {debug && (
          
          <div class="mt-3">
            <h3>DEBUG</h3>
            <h4>Vacbot position :</h4>
            <ul>
              <li>x: {`${props.vacbotStatus.positionX}`}</li>
              <li>y: {`${props.vacbotStatus.positionY}`}</li>
              <li>currentArea : {`${props.vacbotStatus.currentAreaName}`}</li>
            </ul>
            <h4>Vacbot features :</h4>
            <ul>
            <img src={props.imageMap} />
            {deviceFeatures.map(deviceFeature => (
              (deviceFeature.name == 'map') ? 
              (<li>{deviceFeature.name} - <img src={deviceFeature.last_value_string} /></li>) : 
              (<li>{deviceFeature.name} - {deviceFeature.last_value}</li>)
            ))}
            </ul>
            
            <h4>Vacbot other capabilities :</h4>
            <ul>
              {props.vacbotStatus.hasMappingCapabilities && <li>Has mapping capabilities</li>}
              {props.vacbotStatus.hasMoppingSystem && <li>Has mopping system</li>}
              <li>ChargeStatus :{' '} {props.vacbotStatus.chargeStatus}</li>
              <li>CleanReport : {props.vacbotStatus.cleanReport}</li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  export default VacbotDebugBox;