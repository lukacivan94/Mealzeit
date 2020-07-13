import React, { Component } from 'react';
import LeftRightSlider from '../../components/ImageSlider/LeftRightSlider';
import AvatarImage from '../../components/AvatarProfile/AvatarImage';
import mealZeitLogo from '../../assets/images/MealZeit_logo.png';
import styled from 'styled-components';
import { Container, Typography, FormControlLabel, Checkbox, InputLabel, TextField } from '@material-ui/core';
import { Field, reduxForm, InjectedFormProps, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const StyledFieldDiv = styled.div`
    margin-bottom: 10px;
`;

const StyledCheckboxFielddDiv = styled.div`
    margin: 20px 0;

`;

const StyledCheckboxdDiv = styled(StyledCheckboxFielddDiv)`
    display: flex;
    justify-content: center;
`;

const renderCheckbox = ({ input, label }) => (
    <StyledCheckboxFielddDiv>
        <InputLabel>Sharing Options</InputLabel>
        <StyledCheckboxdDiv>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={!!input.value}
                        onChange={input.onChange}
                        style={{
                            color: 'darkorange'
                        }}
                    />
                }
                label={label}
            />
        </StyledCheckboxdDiv>
    </StyledCheckboxFielddDiv>
);

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
}) => (
        <TextField
            label={label}
            type={type}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );

interface RecipeShareProps {
    isPrivate: boolean;
}

type Props = InjectedFormProps<{}, RecipeShareProps> & RecipeShareProps;

class RecipeShareStep extends Component<Props> {
    render() {
        return (
            <Container component='main' maxWidth='sm'>
                <Typography component='h1' variant='h5' style={{ color: 'darkorange' }}>
                    Sharing My Recipe
                    </Typography>
                <StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='isPrivate'
                            component={renderCheckbox}
                            label='Private'
                        />
                    </StyledFieldDiv>
                </StyledFieldDiv>
                {!this.props.isPrivate &&
                    <>
                        <StyledFieldDiv>
                            <LeftRightSlider>
                                <AvatarImage src={mealZeitLogo} key='logo' />
                                <AvatarImage src={mealZeitLogo} key='logo' />
                                <AvatarImage src={mealZeitLogo} key='logo' />
                                <AvatarImage src={mealZeitLogo} key='logo' />
                                <AvatarImage src={mealZeitLogo} key='logo' />
                                <AvatarImage src={mealZeitLogo} key='logo' />
                            </LeftRightSlider>
                        </StyledFieldDiv>
                        <StyledFieldDiv>
                            <Field
                                name='message'
                                component={renderTextField}
                                label='Your Message'
                                fullWidth
                                multiline
                                rows={2}
                                rowsMax={4}
                            />
                        </StyledFieldDiv>
                    </>

                }
            </Container>
        );
    }
}

const selector = formValueSelector('recipeShareForm');

const mapStateToProps = (state) => ({
    isPrivate: selector(state, 'isPrivate')
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm<{}, RecipeShareProps>({
    form: 'recipeShareForm'
})(RecipeShareStep));

// export default reduxForm({
//     form: 'recipeShareForm'
// })(RecipeShareStep);