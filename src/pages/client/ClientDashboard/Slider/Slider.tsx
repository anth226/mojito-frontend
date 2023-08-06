import { Avatar, Button, Card, Carousel, Col, Row } from 'antd';
import ArrowDownMini from 'assets/Icons/ArrowDownMini';
import classes from './Slider.module.css';
import { useRef, useState } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import { USDcurrency } from 'utils/formatters';

type Base64<imageType extends string> =
  `data:image/${imageType};base64${string}`;

export interface slide {
  connectionName: string;
  connectionValue: number;
  connectionImage: Base64<'png'>;
}

interface SliderProps {
  connections: slide[];
  active?: number;
  getCurrentActive?: Function;
}

const Slider = ({ connections, active, getCurrentActive }: SliderProps) => {
  const carouselRef = useRef<CarouselRef | undefined>();
  const [activeSlide, setActiveSlide] = useState(active);

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

  const onSlideClick = (index: number) => {
    if (activeSlide === index) {
      setActiveSlide(undefined);
      if (getCurrentActive instanceof Function) {
        getCurrentActive(undefined);
      }
    } else {
      setActiveSlide(index);
      if (getCurrentActive instanceof Function) {
        getCurrentActive(index);
      }
    }
  };

  return (
    <Row align={'middle'}>
      <Col span={1}>
        {connections.length > 5 && (
          <Button
            icon={<ArrowDownMini />}
            className={classes.prev_button}
            onClick={prev}
          />
        )}
      </Col>
      <Col span={22}>
        <Carousel
          slidesToShow={5}
          dots={false}
          slickGoTo={activeSlide}
          arrows
          infinite={connections.length > 5}
          ref={carouselRef as any}
          className={classes.slider}
        >
          {connections.map((connection, index) => {
            return (
              <div key={index}>
                <Card
                  hoverable
                  className={[
                    classes.slider_entry_card,
                    activeSlide === index ? classes.current_slide_card : '',
                  ].join(' ')}
                  onClick={() => onSlideClick(index)}
                >
                  <Row gutter={[16, 16]} align={'middle'}>
                    <Col>
                      <Avatar
                        style={{
                          backgroundColor: '#FFFFFF',
                          boxShadow: '1px 2px 0px 0px #f3f1f1',
                          padding: '2px',
                        }}
                        shape='square'
                        size={48}
                        src={
                          <img
                            src={connection.connectionImage}
                            alt={''}
                            style={{ objectFit: 'contain' }}
                          />
                        }
                      />
                    </Col>
                    <Col>
                      <p className={classes.slider_entry_card_title}>
                        <b>{connection.connectionName}</b>
                      </p>
                      <p className={classes.slider_entry_card_amount}>
                        {USDcurrency.format(connection.connectionValue)}
                      </p>
                    </Col>
                  </Row>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </Col>
      <Col span={1}>
        {connections.length > 4 && (
          <Button
            icon={<ArrowDownMini />}
            className={classes.next_button}
            onClick={next}
          />
        )}
      </Col>
    </Row>
  );
};

export default Slider;
