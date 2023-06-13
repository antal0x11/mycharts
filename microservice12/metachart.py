class Metachart():

    '''
        Metachart is a simple class to keep track of chart information.
    '''

    def __init__(self, title :str, user_id : str, extension : str, crafted : str, tmp_path : str, chart_type : str = "bar_plot"):
        self.title = title
        self.user_id = user_id
        self.extension = extension
        self.crafted = crafted
        self.tmp_path = tmp_path
        self.chart_type = chart_type