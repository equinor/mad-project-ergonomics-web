import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Button } from '@equinor/eds-core-react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { getCurrentLanguage } from '../store/languages';
import * as categoryActions from '../store/categories/actions';
import ImageDrop from '../components/common/ImageDrop';
import { getPlaceholderText, getText } from '../utils/helpers';
import { getCategories } from '../store/categories';
import IconDelete from '../../resources/images/delete_24px.svg';
import { Toggle } from '../components/common/Toggle';

const Wrapper = styled.div`
  padding:24px;
  flex: 1;
`;


const HeaderSection = styled.div`
  display:flex;
  margin: 60px;
  justify-content: center;
  align-items: center;
`;

const ChallengeTitleTextBox = styled.div`
  display: flex;
  width: 50%;
`;

const ChallengeTitleTextInput = styled.input`
  border: 0 solid white;
  border-bottom: 1px solid #243746;

  flex:1;
  background-color: #F7F7F7;
  border-radius: 4px 4px 0 0;
  height:60px;
  padding: 0 30px 0;

  font-family: Equinor,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
`;

const ImagePlaceholderContainer = styled.div`
  display: flex;
  border-radius: 8px;
  margin:10px 15px;

   ${props =>
  props.invisible &&
  css`
      background-color: transparent;
    `};
`;

class EditCategory extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    categories: PropTypes.array,
    uploadImg: PropTypes.func.isRequired,
    setCategoryTitle: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    setPublished: PropTypes.func.isRequired
  };
  static defaultProps = { categories: [] };
  state = { category: {}, loading: true, };

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { match, categories } = this.props;
    if (nextProps.categories !== categories) {
      const id = match.params.id;
      const category = nextProps.categories.find(c => `${c.id}` === `${id}`);
      this.setState({ category });
    }
    this.setState({ loading: false });
  }

  render() {
    const { category, loading } = this.state;
    if (loading) return <Wrapper><h1>Laster inn...</h1></Wrapper>;

    if (!category) return <Wrapper><h1>Kan ikke finne kategori</h1></Wrapper>;
    return <Wrapper>
      <h1>Rediger område/kategori/gruppe</h1>
      <HeaderSection>
        <ChallengeTitleTextBox>
          <ImagePlaceholderContainer>
            <ImageDrop
              parentEntity={category}
              uploadImg={this.props.uploadImg}
            />
          </ImagePlaceholderContainer>

          <ChallengeTitleTextInput
            placeholder={getPlaceholderText(category) || 'Write some title here...'}
            value={getText(category) || ''}
            onChange={(change) => {
              this.props.setCategoryTitle(category.id, change.target.value);
            }}
          />
        </ChallengeTitleTextBox>
      </HeaderSection>
      <HeaderSection>
        <Button variant={'ghost'}
                onClick={() => {
                  this.props.deleteCategory(category.id, () => {
                    this.props.history.push(`/`);
                    toast(`Deleted Category "${getText(category)}"`);
                  });
                }}
                disabled={category.challenges && category.challenges.length > 0}
        >
          <img style={{ opacity: category.challenges && category.challenges.length > 0 && 0.1 }}
               src={IconDelete} alt={'Delete Category'}/>
          Slett kategori
        </Button>
        <Toggle
          labelOn={'Published'}
          labelOff={'Draft'}
          value={!!category.published}
          onToggle={(published) => this.props.setPublished(category.id, published)}
          key={`Toggle-${category.id}`}
        />
      </HeaderSection>
    </Wrapper>;

  }

}

const mapStateToProps = (state) => ({
  language: getCurrentLanguage(state),
  categories: getCategories(state),
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(categoryActions.fetchCategories()),
    uploadImg: (categoryId, image) => dispatch(categoryActions.uploadCategoryImage({
      categoryId,
      image
    })),
    setCategoryTitle: (categoryId, newCategoryText) => dispatch(categoryActions.setCategoryTitle({
      categoryId,
      newCategoryText
    })),
    deleteCategory: (categoryId, callback) => dispatch(categoryActions.deleteCategory({
      categoryId,
      callback
    })),
    setPublished: (categoryId, published) => dispatch(categoryActions.setCategoryPublished({
      categoryId,
      published
    })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
