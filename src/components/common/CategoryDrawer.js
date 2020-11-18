import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Button } from '@equinor/eds-core-react';
import IconCloseDrawer from '../../../resources/images/close_drawer.svg';
import IconOpenDrawer from '../../../resources/images/open_drawer.svg';
import IconAdd from '../../../resources/images/add_24px.svg';
import IconDragNode from '../../../resources/images/dragNode.svg';
import { getPlaceholderText, getText } from '../../utils/helpers';
import * as appSettingsActions from '../../store/appSettings/actions';
import ImageDrop from './ImageDrop';
import { getCategoryDrawerIsOpen } from '../../store/appSettings/reducer';
import * as categoryActions from '../../store/categories/actions';
import { getCategories } from '../../store/categories';

const ToggleDrawerButton = styled.button`
  margin: 8px;
  background-color: transparent;
  border: 0 solid white;
`;

const Drawer = styled.div`
  background-color: white;
  border: 2px solid #F7F7F7;
`;

const DrawerAlternative = styled.div`
  padding: 8px;
  font-family: Equinor,sans-serif;
  border: 0 solid white;
  display: flex;
  min-width: 48px;
  max-width:500px;
  border-radius: 4px;
  margin:8px;

  background-color: transparent;

  align-items: center;
  justify-content: flex-start;

  &:hover {
    cursor: pointer;
    ${props => !props.active && css`
        background-color: #EFF8F8;
    `};
  }

  ${props => props.active && css`
    background-color: #DEEDEE;
  `}
`;

const DrawerIcon = styled.img`
  width:42px;
  margin: 4px;
`;

const DrawerLabel = styled.div`
  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  letter-spacing: 0.7px;

  color:#243746;

  padding-left: 20px;
  padding-right: 8px;
  ${props => {
  return props.active && css`
    color:  #007079;
  `;
}};
`;

const SortableCategoryWrapper = SortableElement(({ category, renderMethod }) => {
  return renderMethod(category);
});

const MySortableContainer = SortableContainer(({ children }) => {
  return <span>{children}</span>;
});

const DragHandle = SortableHandle(() => {
  return <div style={{ padding: 8, paddingLeft: 16, paddingRight: 16 }}>
    <img src={IconDragNode}
         alt={'Drag handle for reordering categories'}/>
  </div>;
});


class CategoryDrawer extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    createCategory: PropTypes.func.isRequired,
    selectCategory: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    reorderCategories: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  renderDrawerCategory = category => {
    return (<>
        <DrawerAlternative key={`${category.id}`}
                           active={category.isSelected}
                           drawerOpen={this.props.drawerOpen}
                           onClick={() => this.props.selectCategory(category)}>
          {this.props.drawerOpen && <DragHandle/>}
          <ImageDrop parentEntity={category}/>
          {this.props.drawerOpen &&
          <>
            <DrawerLabel active={category.isSelected}>
              {getText(category) || getPlaceholderText(category) || 'New category'}
            </DrawerLabel>
            <Button variant={'ghost'} onClick={() => {
              this.props.history.push(`category/${category.id}`);
            }} style={{ margin: 'auto' }}>Edit</Button>
          </>
          }
        </DrawerAlternative>
      </>
    );
  };

  render() {
    const { createCategory, drawerOpen, categories, reorderCategories } = this.props;
    return <Drawer open={drawerOpen}>
      <ToggleDrawerButton onClick={() => this.props.toggleDrawer()}>
        <DrawerIcon src={drawerOpen ? IconCloseDrawer : IconOpenDrawer}
                    alt={drawerOpen ? 'Close the drawer' : 'Open the drawer'}/>
      </ToggleDrawerButton>
      <MySortableContainer
        useDragHandle
        lockAxis={'y'}
        lockToContainerEdges
        helperClass='pop' // This adds a nice shadow to the card when moving it
        onSortEnd={({ oldIndex, newIndex }) => {
          return reorderCategories({
            oldIndex,
            newIndex,
          });
        }}
      >
        {categories.map((category, index) => (
          <SortableCategoryWrapper key={`item-${category.id}`}
                                   index={index}
                                   category={category}
                                   renderMethod={this.renderDrawerCategory}/>
        ))}
      </MySortableContainer>
      <DrawerAlternative onClick={() => createCategory()}>
        <DrawerIcon src={IconAdd} alt={'New category'}/>
      </DrawerAlternative>
    </Drawer>;
  }
}

const mapStateToProps = state => ({
  categories: getCategories(state),
  drawerOpen: getCategoryDrawerIsOpen(state),
});

const mapDispatchToProps = (dispatch) => {
  return ({
    reorderCategories: payload => dispatch(categoryActions.reorderCategories(payload)),
    createCategory: () => dispatch(categoryActions.createCategory()),
    showEditCategory: () => dispatch(appSettingsActions.showEditCategory()),
    toggleDrawer: () => dispatch(appSettingsActions.toggleCategoryDrawer()),
    selectCategory: (category) => {
      dispatch(categoryActions.selectCategory(category));
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDrawer);
