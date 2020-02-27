import colors from '../../../../core/colors';

const style = {
  card: { flex: 1, flexDirection: 'column' },
  title: {
    fontWeight: 'bold',
    color: colors.grey,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    fontSize: 22,
    paddingBottom: 0,
    marginTop: 10
  },
  subTitle: {
    fontWeight: 'bold',
    color: colors.grey,
    padding: 10,
    paddingTop: 15,
    fontSize: 30,
    textAlign: 'center'
  },
  titleSection: {
    fontWeight: 'bold',
    color: colors.grey,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'center'
  },
  line: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    marginBottom: 15
  }
};

export default style;
