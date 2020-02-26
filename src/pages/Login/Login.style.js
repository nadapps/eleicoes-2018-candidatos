import colors from '../../colors';

const style = {
  background: { width: '100%', resizeMode: 'stretch' },
  container: { width: '100%', height: '100%' },
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
    paddingTop: 20
  },
  description: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 10
  },
  picker: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20
  },
  buttonContainer: {
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: 30,
    width: '100%'
  },
  button: { backgroundColor: colors.primary },
  textButton: { color: colors.black }
};

export default style;
