import datetime

class Chart():
    
    '''
        Chart type to keep track of chart information.
    '''
    
    def __init__(self, user_id : str, title : str, chart_type : str, extension : str, xAxis : str = None, yAxis : str = None) -> None:

        self.user_id = user_id
        self.title = title
        self.chart_type = chart_type
        self.extension = extension
        self.xAxis = xAxis
        self.yAxis = yAxis
        self.time= datetime.datetime.now().__str__().split(".")[0]