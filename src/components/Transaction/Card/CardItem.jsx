import { Card } from 'antd';

const CardItem = ({ card }) => {
  const { title, value, icon: Icon, color, bgIcon } = card;
  return (
    <Card
      styles={{
        body: {
          padding: '10px 16px',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            background: bgIcon,
            padding: '10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon style={{ fontSize: '24px', color }} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className='text-card' style={{ fontWeight: '500' }}>
            {title}
          </p>
          <p
            className='text-card'
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
